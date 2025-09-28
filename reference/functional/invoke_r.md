# invoke_r
* functional[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class R, class F, class... Args>
  constexpr R invoke_r(F&& f, Args&&... args)
    noexcept(is_nothrow_invocable_r_v<R, F, Args...>);
}
```
* is_nothrow_invocable_r_v[link /reference/type_traits/is_nothrow_invocable_r.md]

## 概要
関数呼び出し可能なオブジェクト`f`とその引数`args...`の組み合わせで[*INVOKE*](/reference/concepts/Invoke.md)要件に従った関数呼び出しを行う。
`R`が（CV修飾された）`void`でなければ、戻り値は`R`型へ暗黙変換される。


## テンプレートパラメータ制約
[`is_invocable_r_v`](/reference/type_traits/is_invocable_r.md)`<R, F, Args...>`が`true`


## 戻り値
[`INVOKE<R>`](/reference/concepts/Invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`


## 例
```cpp example
#include <iostream>
#include <functional>

// ASCIIコード 0x43 == 'C'
int ch() { return 0x43; }

int main()
{
  std::cout << std::invoke_r<char>(ch) << std::endl;
}
```
* std::invoke_r[color ff0000]

### 出力例
```
C
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`invoke`](invoke.md)
- [`is_invocable_r`](/reference/type_traits/is_invocable_r.md)
- [`is_nothrow_invocable_r`](/reference/type_traits/is_nothrow_invocable_r.md)


## 参照
- [P2136R3 `invoke_r`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2136r3.html)
