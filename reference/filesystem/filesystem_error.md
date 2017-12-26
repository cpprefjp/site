# filesystem_error
* filesystem[meta header]
* std::filesystem[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  class filesystem_error : public system_error;
}
```
* system_error[link /reference/system_error/system_error.md]

## 概要
`filesystem_error`クラスは、ファイルシステムの操作で発生したエラーを扱う例外クラスである。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](filesystem_error/op_constructor.md) | コンストラクタ | C++17 |
| `~filesystem_error() = default` | デストラクタ | C++17 |
| `filesystem_error& operator=(const filesystem_error&) = default` | 代入演算子 | C++17 |
| [`path1`](filesystem_error/path1.md) | エラーとなったひとつめのパスを取得する | C++17 |
| [`path2`](filesystem_error/path2.md) | エラーとなったふたつめのパスを取得する | C++17 |
| [`code`](filesystem_error/code.md) | エラーコードを取得する | C++17 |
| [`what`](filesystem_error/what.md) | エラー理由の文字列を取得する | C++17 |


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  assert(!fs::exists("a/from.txt"));

  // 存在しないファイルをコピーしようとした
  try {
    fs::copy_file("a/from.txt", "b/to.txt");
  }
  catch (fs::filesystem_error& err) {
    std::cout << err.what() << std::endl;
  }
}
```
* fs::filesystem_error[color ff0000]
* fs::exists[link /reference/filesystem/exists.md.nolink]
* fs::copy_file[link /reference/filesystem/copy_file.md.nolink]

### 出力例
```
filesystem error: cannot copy file: No such file or directory [a/from.txt] [b/to.txt]
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
