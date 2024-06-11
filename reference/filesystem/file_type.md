# file_type
* filesystem[meta header]
* std::filesystem[meta namespace]
* enum[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  enum class file_type {
    none,
    not_found,
    regular,
    directory,
    symlink,
    block,
    character,
    fifo,
    socket,
    implementation-defined,
    unknown
  };
}
```

## 概要
ファイル種別を表す列挙型。

それぞれの列挙子の値は未規定だが、異なる値を持つ。

各列挙子は、以下の意味を持つ：

| 列挙子 | 説明 |
|--------|------|
| `none`      | ファイル種別を判定できなかったか、判定を試みてエラーが発生した |
| `not_found` | ファイルが見つからなかったことを表す擬似的な種別 |
| `regular`   | 通常のファイル |
| `directory` | ディレクトリ・ファイル |
| `symlink`   | シンボリックリンク・ファイル |
| `block`     | ブロック・スペシャル・ファイル。ブロックデバイスとも呼ばれる |
| `character` | キャラクタ・スペシャル・ファイル。キャラクタデバイスとも呼ばれる |
| `fifo`      | FIFOファイルもしくはパイプファイル |
| `socket`    | ソケットファイル |
| implementation-defined | OSのファイルシステムがサポートする実装定義のファイル種別 |
| `unknown`   | ファイルは存在するが種別を決定できなかった |


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"a.txt"};

  fs::file_status status = fs::status("a.txt");
  fs::file_type type = status.type();

  switch (type) {
    case fs::file_type::none:
      std::cout << "none" << std::endl;
      break;
    case fs::file_type::not_found:
      std::cout << "not found" << std::endl;
      break;
    case fs::file_type::regular:
      std::cout << "regular file" << std::endl;
      break;
    case fs::file_type::directory:
      std::cout << "directory file" << std::endl;
      break;
    case fs::file_type::symlink:
      std::cout << "symbolic link file" << std::endl;
      break;
    case fs::file_type::block:
      std::cout << "block special file" << std::endl;
      break;
    case fs::file_type::character:
      std::cout << "character special file" << std::endl;
      break;
    case fs::file_type::fifo:
      std::cout << "FIFO or pipe file" << std::endl;
      break;
    case fs::file_type::socket:
      std::cout << "socket file" << std::endl;
      break;
    case fs::file_type::unknown:
      std::cout << "unknown type file" << std::endl;
      break;
    default:
      std::cout << "implementation-defined file type" << std::endl;
      break;
  }
}
```
* fs::file_type[color ff0000]
* fs::status[link status.md]
* fs::file_status[link file_status.md]
* status.type()[link file_status/type.md]

### 出力
```
regular file
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [LWG Issue 2851. `std::filesystem` enum classes are now underspecified](https://wg21.cmeerw.net/lwg/issue2851)
