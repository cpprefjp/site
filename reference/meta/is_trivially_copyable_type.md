# is_trivially_copyable_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_trivially_copyable_type(info type);
}
```
* info[link info.md]

## 概要
トリビアルコピー可能型であるかを判定する。


## 戻り値
`type`がトリビアルコピー可能型を表す場合に`true`を返す。


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

struct NonTrivial {
  NonTrivial(const NonTrivial&) {}  // ユーザー定義コピーコンストラクタ
};

int main() {
  static_assert(std::meta::is_trivially_copyable_type(^^int));
  static_assert(std::meta::is_trivially_copyable_type(^^Trivial));
  static_assert(!std::meta::is_trivially_copyable_type(^^NonTrivial));
  static_assert(!std::meta::is_trivially_copyable_type(^^std::string));
}
```
* std::meta::is_trivially_copyable_type[color ff0000]

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
- [`std::is_trivially_copyable`](/reference/type_traits/is_trivially_copyable.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
