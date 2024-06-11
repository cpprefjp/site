# file_status
* filesystem[meta header]
* std::filesystem[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  class file_status;
}
```

## 概要
`std::filesystem::file_status`は、ファイル状態を表すクラスである。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](file_status/op_constructor.md) | コンストラクタ | C++17 |
| `~file_status();`                                | デストラクタ | C++17 |
| `file_status& operator=(const file_status&) noexcept = default;`<br/> `file_status& operator=(file_status&&) noexcept = default;` | 代入演算子 | C++17 |


### 変更・観測

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`type`](file_status/type.md)               | ファイル種別を設定・取得する | C++17 |
| [`permissions`](file_status/permissions.md) | ファイルの権限を設定・取得する | C++17 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](file_status/op_equal.md) | 等値比較 | C++20 |
| `friend bool operator!=(const file_status&, const file_status&);` | 非等値比較 (`==`により使用可能) | C++20 |


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"a.txt"};

  fs::file_status status = fs::status("a.txt");

  assert(status.type() == fs::file_type::regular);
  assert((status.permissions() & fs::perms::owner_write) == fs::perms::owner_write);
}
```
* fs::file_status[color ff0000]
* fs::status[link status.md]
* status.type()[link file_status/type.md]
* status.permissions()[link file_status/permissions.md]
* fs::file_type[link file_type.md]
* fs::perms[link perms.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
