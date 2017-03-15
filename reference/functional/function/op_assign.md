# operator=
* functional[meta header]
* std[meta namespace]
* function[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
function& operator=(const function& f);               // (1)
function& operator=(function&& f);                    // (2)
function& operator=(nullptr_t);                       // (3)

template<class F>
function& operator=(F&& f);                           // (4)

template<class F>
function& operator=(reference_wrapper<F> f) noexcept; // (5)
```

## 効果
- (1) : [`function`](op_constructor.md)`(f).`[`swap`](swap.md)`(*this)`
- (2) : `*this`が持つ関数を、`f`のそれで置き換える。
- (3) : `*this`が有効な関数ポインタ、メンバポインタ、もしくは関数オブジェクトを持っている場合、それを解放する。
- (4) : [`function`](op_constructor.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f)).`[`swap`](swap.md)`(*this)`
- (5) : [`function`](op_constructor.md)`(f).`[`swap`](swap.md)`(*this)`


## 戻り値
`*this`


## 例外
- (5) : 投げない


## 備考
- (4) :
    - C++14 : `typename` [`decay`](/reference/type_traits/decay.md)`<F>::type`型の関数オブジェクトが、パラメータとして`ArgTypes...`型をとり、戻り値として`R`型を返さない場合、この関数はオーバーロード解決から除外される。


## 例
```cpp
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::function<int(int)> f;

  // 関数を代入
  f = ident;

  int result = f(1);
  std::cout << result << std::endl;
}
```
* f(1)[link op_call.md]

### 出力
```
1
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2132. `std::function` ambiguity](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2132)
    - C++14から、(4)でシグニチャが合わない関数オブジェクトが渡された場合に、SFINAEされるようになった。

