# Portal.GH

Portal is a Grasshopper3D plugin designed to facilitate [Inter-Process Communication (IPC)](https://en.wikipedia.org/wiki/Inter-process_communication), enabling seamless data exchange between Grasshopper and external applications or processes. By extending workflow capabilities beyond Grasshopper3D and Rhino3D, Portal opens up new possibilities for integrated, multi-platform design processes.

## Adaptors

- [Portal.blender](https://github.com/sean1832/Portal.blender)
- Portal.unity (Coming Soon)
- Portal.revit (Coming Soon)

![demo](/tools/portal/portal-demo.mp4)

## Features

- **Multiple Communication Methods**:
  - UDP Sockets
  - WebSockets
  - Named Pipes
  - Memory Mapped File
  - Local File
- **Geometry Serialization / Deserialization** :
  - Point
  - Mesh
    - UV Coordinates
    - Vertex colors
  - Curve (PolylineCurve, ArcCurve, LineCurve, NurbsCurve)
- **Viewport Camera Serialization**
- **Referenced Object Serialization**
  - Layer full path
  - Layer / Object material and texture
- **Light Serialization**
  - Point Light
  - Spot Light
  - Directional Light
  - Rectangular Light
  - Linear Light
- **Data Compression / Decompression** using GZip
- **Metadata Support** for geometry

> [!NOTE]
> Due to the fact that I am working on this project alone in my free time, the development process maybe slow. I will try to implement features as soon as possible. If you have any feature requests, please let me know by creating a [feature request](https://github.com/sean1832/Portal/issues).

## System Requirements

- Rhino3D 7.13+
- Windows OS

## Installation

1. Download the `Portal.Gh.zip` from the [Releases](https://github.com/sean1832/Portal/releases/latest) page.
2. Unzip and copy the `Portal.GH` folder into `...\AppData\Roaming\Grasshopper\Libraries`
3. Unblock all library files:
   - Right-click on each `.gha` and `.dll` file
   - If there's an "Unblock" option, make sure to select it

## Example Workflow

Here's an example of how you might send a mesh from Grasshopper to another application (e.g., Blender):

1. In Grasshopper:
   - Serialize the mesh into JSON
   - Encode the JSON text into bytes
   - Compress the bytes using GZip
   - Send the compressed data via Named Pipe

2. In the receiving application (e.g., Blender):
   - Receive the compressed bytes
   - Decompress the data
   - Decode the bytes into a string
   - Parse the JSON
   - Deserialize and construct the mesh

## For Developer

### Data Format

- All data is sent and received as bytes.
- Data can be compressed using GZip before sending to save bandwidth and increase transfer speed. Proper decompression handling is required on the receiving end.

### Data Types

1. **Direct Text Messages**: Simple text can be sent and received directly.

2. **Structured Data (JSON)**: Complex data structures can be sent as JSON, allowing for flexible data exchange. The receiving end must know how to handle and parse the JSON data.

3. **Geometry Data**: Geometric data (like meshes, curves) can be serialized into JSON, encoded into bytes, compressed, and then sent. The receiving end must reverse this process to reconstruct the geometry.

### Data Models

Portal provides JSON data models for various geometric entities. These models define the structure for serializing and deserializing geometric data:

#### Geometry Data Models

- [Point Data Model](https://github.com/sean1832/Portal/blob/master/Example/data-model/point.json)
- [Mesh Data Model](https://github.com/sean1832/Portal/blob/master/Example/data-model/mesh.json)
- [Polyline Curve Model](/https://github.com/sean1832/Portal/blob/masterExample/data-model/polyline-curve.json)
- [Arc Curve Model](https://github.com/sean1832/Portal/blob/master/Example/data-model/arc-curve.json)
- [Line Curve Model](https://github.com/sean1832/Portal/blob/master/Example/data-model/line-curve.json)
- [Nurbs Curve Model](https://github.com/sean1832/Portal/blob/master/Example/data-model/nurbs-curve.json)

#### Packet Data Model

Packet is a generic model that wraps the data being sent. It includes the data itself and metadata about the data.

- [Packet Data Model](https://github.com/sean1832/Portal/blob/master/Example/data-model/packet-points.json)

### Headers

Portal uses headers to identify properties of the data being sent. These headers are used to determine the type of data being sent, the compression status, and other relevant information.

| Field        | type     | Size (bytes) | Description                                                              |
| ------------ | -------- | ------------ | ------------------------------------------------------------------------ |
| MagicNumber  | `byte[]` | 2            | Header identifier. Value: `0x70, 0x6b` (ASCII: `pk`)                     |
| isCompressed | `bool`   | 1            | Compression flag                                                         |
| isEncrypted  | `bool`   | 1            | Encryption flag                                                          |
| CRC16        | `int16`  | 2            | [CRC-16 checksum](https://en.wikipedia.org/wiki/Cyclic_redundancy_check) |
| size         | `int32`  | 4            | Payload size                                                             |
| **Total**    |          | **10**       | **Total header size**                                                    |

## Code Examples

- [Grasshopper Implementation](https://github.com/sean1832/Portal/blob/master/Example/grasshopper/)
- [Python Implementation](https://github.com/sean1832/Portal/blob/master/Example/python-native/)
- **Blender Integration**:
  - ✨ **New**: [Portal.blender](https://github.com/sean1832/Portal.blender) - A user-friendly and feature-rich Blender add-on.
  - 🗃️ **Legacy**: [Python-Blender Implementation](https://github.com/sean1832/Portal/tree/75a81188b3ee689532f92b246b4fc5bae1cfcb20/Example/python-blender) - Old script examples (compatible up to Portal.Gh [v0.1.2](https://github.com/sean1832/Portal/releases/tag/0.1.2)).
    > ⚠️ Note: The legacy implementation is outdated and not compatible with latest Portal.Gh. It's provided for reference only.
