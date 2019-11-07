# handle
* format[meta header]
* class[meta id-type]
* std[meta namespace]
* basic_format_arg[meta class]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Context>
  class basic_format_arg<Context>::handle;
}
```

## 概要
`basic_format_arg`においてユーザー定義型の値とフォーマット関数のアドレスを保持するのに使用されるクラス。

## メンバ関数

| 名前                         | 説明                                                     | 対応バージョン |
|------------------------------|----------------------------------------------------------|----------------|
| [`format`](handle/format.md.nolink) | ユーザー定義型に対応するフォーマット関数を実行する       | C++20          |

## 実装例

```cpp
namespace std {
  template<class Context>
  class basic_format_arg<Context>::handle {
    using charT = typename Context::char_type;
    using format_function = void(*)(basic_format_parse_context<charT>&, Context&, const void*);

    const void* ptr_;
    format_function format_;

    template<class T> explicit handle(const T& val) noexcept
      :ptr_(addressof(val))
      ,format_function(
        [](basic_format_parse_context<charT>& parse_ctx, Context& format_ctx, const void* ptr) {
          typename Context::template formatter_type<T> f;
          parse_ctx.advance_to(f.parse(parse_ctx));
          format_ctx.advance_to(f.format(*static_cast<const T*>(ptr), format_ctx));
        }
      )
    {}

    friend class basic_format_arg<Context>;

  public:
    void format(basic_format_parse_context<charT>& parse_ctx, Context& format_ctx) const
    {
      format_(parse_ctx, format_ctx, ptr_);
    }
  };
}
```
* basic_format_arg[link /reference/format/basic_format_arg.md]
* basic_format_parse_context[link /reference/format/basic_format_parse_context.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
