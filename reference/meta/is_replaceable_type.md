# is_replaceable_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_replaceable_type(info type);
}
```
* info[link info.md]

## 概要
置換可能型 (replaceable type) であるかを判定する。[`std::is_replaceable`](/reference/type_traits/is_replaceable.md.nolink)に対応する。

置換可能型とは、あるオブジェクトの生存期間中にそのストレージ上に同じ型の新しいオブジェクトを構築しても、元のオブジェクトへのポインタや参照が新しいオブジェクトを指すことが保証される型である。コピー・ムーブ代入演算子やデストラクタをユーザー定義していないトリビアルなクラスや、スカラ型が該当する。コンテナの最適化（[`std::vector`](/reference/vector/vector.md)の再配置など）に利用される概念である。


## 戻り値
`type`が表す型が置換可能型である場合に`true`を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <string>

struct Trivial {
  int x;
  double y;
};

// デストラクタをユーザー定義すると置換可能でなくなる
struct NonReplaceable {
  ~NonReplaceable() { /* ユーザー定義のデストラクタ */ }
};

int main() {
  static_assert(std::meta::is_replaceable_type(^^int));
  static_assert(std::meta::is_replaceable_type(^^Trivial));
  static_assert(!std::meta::is_replaceable_type(^^NonReplaceable));
  // std::stringは内部でリソース管理するため置換可能でない
  static_assert(!std::meta::is_replaceable_type(^^std::string));
}
```
* std::meta::is_replaceable_type[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::is_replaceable`](/reference/type_traits/is_replaceable.md.nolink)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
