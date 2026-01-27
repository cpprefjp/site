# visit_format_arg
* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]
* cpp26deprecated[meta cpp]

```cpp
namespace std {
  template<class Visitor, class Context>
  see below visit_format_arg(Visitor&& vis, basic_format_arg<Context> arg); // (1)
}
```
* basic_format_arg[link /reference/format/basic_format_arg.md]

この関数は、C++26から非推奨となった。代わりに[`std::basic_format_arg`](basic_format_arg.md)`::`[`visit()`](basic_format_arg/visit.md)メンバ関数を使用すること。

## 概要

* (1) : `basic_format_arg`オブジェクトが現在保持している型に対応する関数を呼び出し、呼び出された関数の戻り値型で戻り値を返す

## 効果

次と等しい。

```cpp
return visit(forward<Visitor>(vis), arg.value);
```
* visit[link /reference/variant/visit.md]
* forward[link /reference/utility/forward.md]

ただし、便宜上、`basic_format_arg`は次のprivateメンバを持つとする。
(これらのprivateメンバは規格に含まれない)

```cpp
namespace std {
  template<class Context>
  class basic_format_arg {
  public:
    class handle;

  private:
    using charT = typename Context::char_type;

    variant<monostate, bool, charT,
            int, unsigned int, long long int, unsigned long long int,
            float, double, long double,
            const charT*, basic_string_view<charT>,
            const void*, handle> value;

    template<class Visitor, class Ctx>
    friend auto visit_format_arg(Visitor&& vis, basic_format_arg<Ctx> arg);
  };
}
```
* variant[link /reference/variant/variant.md]
* monostate[link /reference/variant/monostate.md]
* handle[link /reference/format/basic_format_arg/handle.md]
* basic_string[link /reference/string/basic_string.md]
* basic_format_arg[link /reference/format/basic_format_arg.md]

## 戻り値

* (1) : [`basic_format_arg`](/reference/format/basic_format_arg.md)オブジェクトが現在保持している型に対応する関数を呼び出した戻り値


## 実装例
```cpp
namespace std {
  template<class Visitor, class Context>
  auto visit_format_arg(Visitor&& vis, basic_format_arg<Context> arg)
  {
    return visit(forward<Visitor>(vis), arg.value);
  }
}
```
* basic_format_arg[link /reference/format/basic_format_arg.md]
* visit[link /reference/variant/visit.md]
* forward[link /reference/utility/forward.md]

## 備考
[`basic_format_arg`](/reference/format/basic_format_arg.md)オブジェクトが現在保持している型がユーザー定義型の場合、ビジターに渡されるのは[`handle`](/reference/format/basic_format_arg/handle.md)型のオブジェクトになるので、元々どのような型だったかを知ることはできない。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
- [P2637R3 Member `visit`](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2637r3.html)