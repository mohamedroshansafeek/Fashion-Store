import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectTrigger, SelectValue, Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {

  const renderInputsByComponentType = (control) => {
    const value = formData[control.name] || '';

    switch (control.componentType) {
      case "input":
        return (
          <Input
            name={control.name}
            id={control.name}
            type={control.type}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="w-full"
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) =>
              setFormData({ ...formData, [control.name]: val })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={control.id || control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="w-full"
          />
        );

      default:
        return (
          <Input
            name={control.name}
            id={control.name}
            type={control.type}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="w-full"
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
        {formControls.map((control) => (
          <div className="flex flex-col gap-1" key={control.name}>
            <Label className="mb-1">{control.label}</Label>
            {renderInputsByComponentType(control)}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        disabled={isBtnDisabled}
        className="mt-4 w-full sm:w-auto px-6"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
