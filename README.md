# TrainingHub Annotate

The best image/video annotation tool ever.

![Screenshot of Annotator](https://user-images.githubusercontent.com/1910070/51199716-83c72080-18c5-11e9-837c-c3a89c8caef4.png)

## Usage

```javascript
import Annotator from "traininghub-annotate/Annotator"

const App = () => (
  <Annotator
    selectedImage="https://example.com/image1.png"
    taskDescription="# Draw region around each face\n\nInclude chin and hair."
    images={[{"src": "https://example.com/image1.png", name: "Image 1"}]}
    regionClsList={["Man Face", "Woman Face"]}
  />
)
```

## Developers

### Icons

Consult these icon repositories:

- [Material Icons](https://material.io/tools/icons/)
- [Font Awesome Icons](https://fontawesome.com/icons?d=gallery&m=free)
