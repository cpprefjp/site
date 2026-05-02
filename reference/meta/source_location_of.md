# source_location_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::source_location source_location_of(info r);
}
```
* info[link info.md]

## 概要
リフレクションのソース位置を取得する。

任意のリフレクションを受け取れる。


## 戻り値
`r`が表すエンティティが宣言されたソース位置を[`std::source_location`](/reference/source_location/source_location.md)として返す。

ただし、以下のリフレクションに対してはデフォルト構築された`source_location`（ソース位置情報なし）を返す：

- 値
- クラス型・列挙型以外の型
- グローバル名前空間
- データメンバ仕様

それ以外のリフレクションに対する戻り値は実装定義である。


## 例
```cpp example
#include <meta>
#include <print>

struct MyClass {};

int main() {
  constexpr auto loc = std::meta::source_location_of(^^MyClass);
  std::println("{}:{}", loc.file_name(), loc.line());
}
```
* file_name[link /reference/source_location/source_location/file_name.md]
* line[link /reference/source_location/source_location/line.md]

#### 出力例
```
main.cpp:38
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
