# 推論補助
* format[meta header]
* std[meta namespace]
* basic_format_args[meta class]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Context, class... Args>
  basic_format_args(format_arg_store<Context, Args...>)
    -> basic_format_args<Context>; // (1) C++23
}
```
* format_arg_store[italic]

## 概要
[`basic_format_args`](../basic_format_args.md)クラステンプレートの型推論補助。

- (1) : [`make_format_args`](../make_format_args.md)の戻り値（_`format_arg_store`_）から、テンプレートパラメータ`Context`を推論する。

ただし、 _`format_arg_store`_ は`make_format_args`の戻り値と同じ型であることを示す便宜上の名前であり、規格には含まれない。


## 備考
この推論補助はC++23に対する欠陥報告 (LWG 3810) として追加されたものであり、コンパイラは早期に対応している場合がある。そのため、C++20モードでも使用できる可能性がある。


## 例
```cpp example
#include <format>

int main()
{
  // make_format_argsの戻り値から、basic_format_args<format_context>を推論する
  std::basic_format_args args = std::make_format_args();
  (void)args;
}
```
* std::make_format_args[link ../make_format_args.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 [mark verified]


## 関連項目
- [`basic_format_args`](../basic_format_args.md)
- [`make_format_args`](../make_format_args.md)


## 参照
- [LWG Issue 3810. CTAD for `std::basic_format_args`](https://cplusplus.github.io/LWG/issue3810)
    - C++23で、[`make_format_args`](../make_format_args.md)の戻り値から`Context`を推論するための推論補助が追加された
