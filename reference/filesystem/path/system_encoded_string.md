# system_encoded_string
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
std::string system_encoded_string() const;
```

## 概要
OS依存のパス名エンコーディング (システムのマルチバイト文字コード) で、パス文字列を取得する。


## 戻り値
[`native()`](native.md)を返す。

文字コード変換が必要な場合、その変換は[`<filesystem>`](/reference/filesystem.md)のパス変換規則に従って行われる。


## 備考
- 文字コード変換は損失をともなう可能性があるため、この関数で取得した文字列はレガシーなシステムAPIにパスを渡す用途にのみ適している
- 表示やフォーマットの用途では、[`display_string()`](display_string.md)、[`std::format()`](/reference/format/format.md)、[`std::print()`](/reference/print/print.md)を使用すること


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  std::string s = p.system_encoded_string();
  std::cout << s << std::endl;
}
```
* p.system_encoded_string()[color ff0000]

### 出力
```
/usr/bin/clang
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`native()`](native.md) (システムの文字コードでパス文字列を取得する)
- [`string()`](string.md) (この関数と同等の動作だが、C++26で非推奨)
- [`display_string()`](display_string.md) (表示用のリテラルエンコーディングで取得する)
- [`generic_system_encoded_string()`](generic_system_encoded_string.md) (環境非依存フォーマットで取得する)


## 参照
- [P2319R5 Prevent path presentation problems](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2319r5.html)
    - 非推奨となった[`string()`](string.md)に代わり、システム依存エンコーディングへの変換であることを明確にしたこの関数がC++26で追加された
