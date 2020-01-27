# u8path
* filesystem[meta header]
* std::filesystem[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]
* cpp20deprecated[meta cpp]

```cpp
namespace std::filesystem {
  template <class Source>
  path u8path(const Source& source);                    // (1)

  template <class InputIterator>
  path u8path(InputIterator first, InputIterator last); // (2)
}
```
* path[link path.md]

この関数は、C++20で非推奨となった。UTF-8エンコードされたパス文�列は[`char8_t`](/lang/cpp20/char8_t.md)型文�列として`path`クラスのコンストラクタに、指定すること。


## 概要
UTF-8エンコードされた文�列からパスオブジェクトを構築する。

- (1) : UTF-8エンコードされた`char`配列、[`std::string`](/reference/string/basic_string.md)、[`std::string_view`](/reference/string_view/basic_string_view.md)オブジェクトからパスオブジェクトを構築する
- (2) : UTF-8エンコードされた`char`要素の範囲から、パスオブジェクトを構築する


## 要件
- `source`および文�範囲`[first, last)`がUTF-8エンコードされていること
- 文�列の要素となる文�型が`char`であること


## 効果
- `path`クラスの`value_type`が`char`であれば (POSIX)、文�コード変換せずに`path`オブジェクトを構築して返す
- そうでなければ、OSのファイルシステムが扱う文�コードに変換し (WindowsならUTF-16)、`path`オブジェクトを構築して返す

## 非推奨の詳細 (C++20)
C++20ではUTF-8エンコードされた文�には[`char8_t`](/lang/cpp20/char8_t.md)が型付けられ、`char`型とオーバー�ードできるようになった。[`path`クラスのコンストラクタ](/reference/filesystem/path/op_constructor.md)に`char8_t`版のオーバー�ードが追加されたため、この関数は不要になった。


## 例
```cpp example
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // (1)
  {
    fs::path p = fs::u8path(u8"a/b/c");
    std::ofstream file{p};
  }

  // (2)
  {
    std::string raw_path = u8"a/b/c";
    fs::path p = fs::u8path(raw_path.begin(), raw_path.end());
    std::ofstream file{p};
  }
}
```
* fs::u8path[color ff0000]
* raw_path.begin()[link /reference/string/basic_string/begin.md]
* raw_path.end()[link /reference/string/basic_string/end.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
