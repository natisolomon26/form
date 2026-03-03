"use client";

import { motion, Reorder } from "framer-motion";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useState } from "react";
import { 
  Save, 
  Eye, 
  Plus, 
  Trash2,
  GripVertical,
  Copy,
  ChevronDown,
  Type,
  Hash,
  CheckSquare,
  CircleDot,
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  Star,
  ToggleLeft,
  AlertCircle
} from "lucide-react";

// Field type definitions
interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  helpText?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Field type icon component
interface FieldType {
  type: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

// Available field types
const fieldTypes: FieldType[] = [
  { type: "text", label: "Short Text", icon: Type, color: "bg-blue-100 text-blue-600" },
  { type: "textarea", label: "Paragraph", icon: FileText, color: "bg-indigo-100 text-indigo-600" },
  { type: "number", label: "Number", icon: Hash, color: "bg-purple-100 text-purple-600" },
  { type: "email", label: "Email", icon: Mail, color: "bg-pink-100 text-pink-600" },
  { type: "phone", label: "Phone", icon: Phone, color: "bg-orange-100 text-orange-600" },
  { type: "radio", label: "Multiple Choice", icon: CircleDot, color: "bg-green-100 text-green-600" },
  { type: "checkbox", label: "Checkboxes", icon: CheckSquare, color: "bg-teal-100 text-teal-600" },
  { type: "select", label: "Dropdown", icon: ChevronDown, color: "bg-cyan-100 text-cyan-600" },
  { type: "date", label: "Date", icon: Calendar, color: "bg-rose-100 text-rose-600" },
  { type: "location", label: "Location", icon: MapPin, color: "bg-amber-100 text-amber-600" },
  { type: "rating", label: "Rating", icon: Star, color: "bg-yellow-100 text-yellow-600" },
  { type: "toggle", label: "Yes/No", icon: ToggleLeft, color: "bg-lime-100 text-lime-600" },
];

// Generate unique ID without using Date.now()
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Type for form responses
interface FormResponses {
  [key: string]: string | string[] | number;
}

export default function DashboardForm() {
  const [formTitle, setFormTitle] = useState("Campus Outreach Form");
  const [formDescription, setFormDescription] = useState("Please fill in the outreach details below");
  const [fields, setFields] = useState<FormField[]>([
    {
      id: generateId(),
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      helpText: "As it appears on your ID"
    },
    {
      id: generateId(),
      type: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      required: true,
      helpText: "We'll send a confirmation to this email"
    },
    {
      id: generateId(),
      type: "radio",
      label: "Campus",
      required: true,
      options: ["Addis Ababa University", "Bahir Dar University", "Mekelle University", "Other"],
      helpText: "Select your campus"
    },
    {
      id: generateId(),
      type: "number",
      label: "Number of Students Reached",
      placeholder: "e.g., 50",
      required: true,
      validation: { min: 0, max: 1000 },
      helpText: "Total students who attended"
    },
    {
        id: generateId(),
        type: "checkbox",
        label: "Types of Outreach Activities",
        options: ["Campus Evangelism", "Bible Study", "Prayer Meeting", "Leadership Training", "Community Service"],
        helpText: "Select all that apply",
        required: false
    },
    {
        id: generateId(),
        type: "textarea",
        label: "Additional Comments",
        placeholder: "Share any additional information about the outreach...",
        helpText: "Optional feedback",
        required: false
    }
  ]);

  const [previewMode, setPreviewMode] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [formResponses, setFormResponses] = useState<FormResponses>({});

  // Add new field
  const addField = (type: string) => {
    const newField: FormField = {
      id: generateId(),
      type,
      label: `New ${type} field`,
      placeholder: type === "select" || type === "radio" || type === "checkbox" ? undefined : "Enter value",
      required: false,
      options: type === "select" || type === "radio" || type === "checkbox" ? ["Option 1", "Option 2", "Option 3"] : undefined,
      helpText: "Help text for this field"
    };
    setFields([...fields, newField]);
  };

  // Delete field
  const deleteField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
    if (selectedField === id) setSelectedField(null);
  };

  // Duplicate field
  const duplicateField = (field: FormField) => {
    const newField = {
      ...field,
      id: generateId(),
      label: `${field.label} (copy)`
    };
    setFields([...fields, newField]);
  };

  // Update field
  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  // Add option to field
  const addOption = (fieldId: string) => {
    setFields(fields.map(f => {
      if (f.id === fieldId && f.options) {
        return { ...f, options: [...f.options, `Option ${f.options.length + 1}`] };
      }
      return f;
    }));
  };

  // Update option
  const updateOption = (fieldId: string, index: number, value: string) => {
    setFields(fields.map(f => {
      if (f.id === fieldId && f.options) {
        const newOptions = [...f.options];
        newOptions[index] = value;
        return { ...f, options: newOptions };
      }
      return f;
    }));
  };

  // Delete option
  const deleteOption = (fieldId: string, index: number) => {
    setFields(fields.map(f => {
      if (f.id === fieldId && f.options) {
        return { ...f, options: f.options.filter((_, i) => i !== index) };
      }
      return f;
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted:", formResponses);
    alert("Form submitted successfully!");
  };

  // Get field icon component safely
  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find(t => t.type === type);
    return fieldType ? fieldType.icon : Type;
  };

  // Get field color safely
  const getFieldColor = (type: string) => {
    const fieldType = fieldTypes.find(t => t.type === type);
    return fieldType ? fieldType.color : "bg-gray-100 text-gray-600";
  };

  // Render form field in edit mode
  const renderEditField = (field: FormField) => {
    const isSelected = selectedField === field.id;
    const FieldIcon = getFieldIcon(field.type);
    const fieldColor = getFieldColor(field.type);

    return (
      <motion.div
        key={field.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`relative group mb-4 rounded-xl border-2 transition-all ${
          isSelected 
            ? "border-sky-600 shadow-lg bg-sky-50/50" 
            : "border-gray-200 hover:border-sky-300 bg-white"
        }`}
        onClick={() => setSelectedField(field.id)}
      >
        {/* Field Controls */}
        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-1">
            <GripVertical size={16} className="text-gray-400 cursor-move" />
          </div>
        </div>

        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); duplicateField(field); }}
            className="p-1.5 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <Copy size={14} className="text-gray-600" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); deleteField(field.id); }}
            className="p-1.5 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-red-50 transition"
          >
            <Trash2 size={14} className="text-red-500" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedField(isSelected ? null : field.id); }}
            className="p-1.5 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <ChevronDown size={14} className={`text-gray-600 transform transition-transform ${isSelected ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Field Preview */}
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-2 rounded-lg ${fieldColor}`}>
              <FieldIcon size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-sky-600 focus:outline-none px-1 py-0.5 w-full"
                  placeholder="Field Label"
                />
                {field.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </div>
              {field.helpText && (
                <input
                  type="text"
                  value={field.helpText}
                  onChange={(e) => updateField(field.id, { helpText: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm text-gray-500 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-sky-600 focus:outline-none px-1 py-0.5 w-full mt-1"
                  placeholder="Help text"
                />
              )}
            </div>
          </div>

          {/* Field Type Specific Preview */}
          <div className="ml-12">
            {field.type === "text" && (
              <input
                type="text"
                placeholder={field.placeholder || "Enter text"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-default"
                disabled
              />
            )}

            {field.type === "textarea" && (
              <textarea
                placeholder={field.placeholder || "Enter paragraph"}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-default"
                disabled
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                placeholder={field.placeholder || "Enter number"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-default"
                disabled
              />
            )}

            {field.type === "email" && (
              <input
                type="email"
                placeholder={field.placeholder || "email@example.com"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-default"
                disabled
              />
            )}

            {field.type === "phone" && (
              <input
                type="tel"
                placeholder={field.placeholder || "+251 00 000 0000"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-default"
                disabled
              />
            )}

            {field.type === "radio" && field.options && (
              <div className="space-y-2">
                {field.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CircleDot size={16} className="text-gray-400" />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(field.id, idx, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-2 py-1 border-b border-transparent hover:border-gray-300 focus:border-sky-600 focus:outline-none bg-transparent"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteOption(field.id, idx); }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={(e) => { e.stopPropagation(); addOption(field.id); }}
                  className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1 mt-2"
                >
                  <Plus size={14} />
                  Add option
                </button>
              </div>
            )}

            {field.type === "checkbox" && field.options && (
              <div className="space-y-2">
                {field.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckSquare size={16} className="text-gray-400" />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(field.id, idx, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-2 py-1 border-b border-transparent hover:border-gray-300 focus:border-sky-600 focus:outline-none bg-transparent"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteOption(field.id, idx); }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={(e) => { e.stopPropagation(); addOption(field.id); }}
                  className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1 mt-2"
                >
                  <Plus size={14} />
                  Add option
                </button>
              </div>
            )}

            {field.type === "select" && field.options && (
              <div className="relative">
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 appearance-none cursor-default" disabled>
                  <option>Select an option</option>
                  {field.options.map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            )}

            {field.type === "date" && (
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-default"
                disabled
              />
            )}

            {field.type === "location" && (
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={field.placeholder || "Enter location"}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-default"
                  disabled
                />
              </div>
            )}

            {field.type === "rating" && (
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className="text-gray-300 cursor-default"
                  />
                ))}
              </div>
            )}

            {field.type === "toggle" && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" />
                </div>
                <span className="text-gray-400">Yes / No</span>
              </div>
            )}
          </div>

          {/* Field Settings Panel (when selected) */}
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Placeholder
                  </label>
                  <input
                    type="text"
                    value={field.placeholder || ""}
                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                    placeholder="Enter placeholder text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Field Type
                  </label>
                  <select
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                    value={field.type}
                    onChange={(e) => updateField(field.id, { type: e.target.value })}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {fieldTypes.map(ft => (
                      <option key={ft.type} value={ft.type}>{ft.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-600">Required field</span>
                </label>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // Render form in preview mode
  const renderPreviewField = (field: FormField) => {
    return (
      <div key={field.id} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {field.type === "text" && (
          <input
            type="text"
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            value={formResponses[field.id] as string || ""}
            onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
            required={field.required}
          />
        )}

        {field.type === "textarea" && (
          <textarea
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            value={formResponses[field.id] as string || ""}
            onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
            required={field.required}
          />
        )}

        {field.type === "number" && (
          <input
            type="number"
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            value={formResponses[field.id] as string || ""}
            onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
          />
        )}

        {field.type === "email" && (
          <input
            type="email"
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            value={formResponses[field.id] as string || ""}
            onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
            required={field.required}
          />
        )}

        {field.type === "phone" && (
          <input
            type="tel"
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            value={formResponses[field.id] as string || ""}
            onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
            required={field.required}
          />
        )}

        {field.type === "radio" && field.options && (
          <div className="space-y-2">
            {field.options.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formResponses[field.id] === option}
                  onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
                  className="text-sky-600 focus:ring-sky-500"
                  required={field.required}
                />
                <span className="text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}

        {field.type === "checkbox" && field.options && (
          <div className="space-y-2">
            {field.options.map((option) => {
              const currentValues = (formResponses[field.id] as string[]) || [];
              return (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={currentValues.includes(option)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);
                      setFormResponses({ ...formResponses, [field.id]: newValues });
                    }}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-600">{option}</span>
                </label>
              );
            })}
          </div>
        )}

        {field.type === "select" && field.options && (
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            value={formResponses[field.id] as string || ""}
            onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        {field.type === "date" && (
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            value={formResponses[field.id] as string || ""}
            onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
            required={field.required}
          />
        )}

        {field.type === "location" && (
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={field.placeholder || "Enter location"}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              value={formResponses[field.id] as string || ""}
              onChange={(e) => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
              required={field.required}
            />
          </div>
        )}

        {field.type === "rating" && (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormResponses({ ...formResponses, [field.id]: star })}
                className={`p-1 rounded-lg transition ${
                  (formResponses[field.id] as number || 0) >= star
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-200"
                }`}
              >
                <Star size={24} fill={(formResponses[field.id] as number || 0) >= star ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        )}

        {field.type === "toggle" && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFormResponses({ ...formResponses, [field.id]: "yes" })}
              className={`px-4 py-2 rounded-lg border transition ${
                formResponses[field.id] === "yes"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setFormResponses({ ...formResponses, [field.id]: "no" })}
              className={`px-4 py-2 rounded-lg border transition ${
                formResponses[field.id] === "no"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              No
            </button>
          </div>
        )}

        {field.helpText && (
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <AlertCircle size={12} />
            {field.helpText}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-white">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-sky-100 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-sky-900">Form Builder</h1>
              <p className="text-sm text-sky-700/70">Create and customize your outreach forms</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 transition flex items-center gap-2"
              >
                <Eye size={18} />
                {previewMode ? "Edit Mode" : "Preview Mode"}
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-700 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
              >
                <Save size={18} />
                Save Form
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Form Builder Area */}
          <div className="flex-1 p-8">
            {/* Form Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-6"
            >
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-3xl font-bold text-sky-900 bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-sky-600 focus:outline-none w-full mb-2 px-1 py-1"
                placeholder="Form Title"
                disabled={previewMode}
              />
              <input
                type="text"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-sky-600 focus:outline-none w-full px-1 py-1"
                placeholder="Form Description"
                disabled={previewMode}
              />
            </motion.div>

            {/* Form Fields */}
            {previewMode ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-sky-900 mb-6">{formTitle}</h2>
                <p className="text-gray-600 mb-8">{formDescription}</p>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                  {fields.map(renderPreviewField)}
                  <button
                    type="submit"
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-sky-900 to-sky-700 text-white rounded-lg hover:shadow-lg transition"
                  >
                    Submit Form
                  </button>
                </form>
              </div>
            ) : (
              <Reorder.Group
                axis="y"
                values={fields}
                onReorder={setFields}
                className="space-y-4"
              >
                {fields.map((field) => (
                  <Reorder.Item key={field.id} value={field}>
                    {renderEditField(field)}
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </div>

          {/* Field Types Panel (Edit Mode Only) */}
          {!previewMode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto"
            >
              <h3 className="font-semibold text-sky-900 mb-4 flex items-center gap-2">
                <Plus size={18} className="text-sky-600" />
                Add Field
              </h3>
              
              <div className="space-y-2">
                {fieldTypes.map((fieldType) => {
                  const Icon = fieldType.icon;
                  return (
                    <button
                      key={fieldType.type}
                      onClick={() => addField(fieldType.type)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 transition group"
                    >
                      <div className={`p-2 rounded-lg ${fieldType.color}`}>
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-sky-900">
                        {fieldType.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-xs font-medium text-gray-500 mb-3">FORM SETTINGS</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Collect email addresses</span>
                    <input type="checkbox" className="rounded border-gray-300 text-sky-600" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Limit to one response</span>
                    <input type="checkbox" className="rounded border-gray-300 text-sky-600" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Show progress bar</span>
                    <input type="checkbox" className="rounded border-gray-300 text-sky-600" />
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}