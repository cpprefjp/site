# operator()
* functional[meta header]
* std[meta namespace]
* move_only_function[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
R operator()(ArgTypes... args) /*cv*/ /*ref*/ noexcept(/*noex*/);
```

## 概要
関数を呼び出す。

`operator()`のCV修飾子 *cv*, 参照修飾子 *ref*, noexcept例外指定 *noex* は、[`move_only_function`](../move_only_function.md)に指定するテンプレートパラメータ`R(ArgTypes...)`部のものと等しい。

説明用のプレースホルダ *inv-quals* を次のように定義する :

- *ref* が空（参照修飾無し）ならば、*cv*`&`
- そうでなければ、*cv* *ref*


## 事前条件
`*this`は関数ポインタまたは関数オブジェクトを保持していること。


## 効果
`*this`が保持している`F`型の関数ポインタまたは関数オブジェクト`f`に対して、[`INVOKE<R>`](/reference/concepts/Invoke.md)`(static_cast<F /*inv-quals*/>(f),` [`std::forward`](/reference/utility/forward.md)`<ArgTypes>(args)...)`を行う。


## 戻り値
`R`型が`void`の場合は何も返さない。そうでなければ、関数呼び出しの戻り値を返す。


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x)
{ return x; }

int main()
{
  std::move_only_function<int(int)> f = ident;

  // 関数呼び出し : 保持しているident()関数を呼び出す
  int result = f(1);

  std::cout << result << std::endl;
}
```

### 出力
```
1
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0288R9 move_only_function](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0288r9.html)
