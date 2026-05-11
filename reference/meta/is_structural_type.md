# is_structural_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_structural_type(info type);
}
```
* info[link info.md]

## 概要
構造的型 (structural type) であるかを判定する。[`std::is_structural`](/reference/type_traits/is_structural.md)に対応する。

構造的型は、定数テンプレートパラメータとして使用できる型である。具体的には以下のいずれかである：

- スカラ型
- 左辺値参照型
- 直接基底クラスとメンバ変数がすべて`public`かつ`mutable`でなく、それらの型がすべて構造的型（または構造的型の配列）であるリテラルクラス型
- キャプチャを持たないラムダ式のクロージャ型

なお、右辺値参照型は構造的型ではない。


## 戻り値
`type`が構造的型を表す場合に`true`を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct Structural {
  int x;
  double y;
};

struct NotStructural {
private:
  int x;  // privateメンバがあるため構造的型ではない
};

int main() {
  static_assert(std::meta::is_structural_type(^^int));
  static_assert(std::meta::is_structural_type(^^int&));
  static_assert(std::meta::is_structural_type(^^Structural));
  static_assert(!std::meta::is_structural_type(^^NotStructural));
  static_assert(!std::meta::is_structural_type(^^int&&));  // 右辺値参照は構造的型ではない
}
```
* std::meta::is_structural_type[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::is_structural`](/reference/type_traits/is_structural.md)


## 参照
- [P3856R8 New reflection metafunction - is_structural_type (US NB comment 49)](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3856r8.pdf)
