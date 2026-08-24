# mem_fn
* functional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R, class T>
  unspecified mem_fn(R T::* pm);            //C++11

  template <class R, class T>
  unspecified mem_fn(R T::* pm) noexcept;   //C++17

  template <class R, class T>
  constexpr unspecified mem_fn(R T::* pm) noexcept; //C++20
}
```
* unspecified[italic]


## 概要
与えられたメンバ関数を呼び出す [*Callable*](/reference/concepts/Callable.md) オブジェクトを生成して返す。


## 戻り値

### C++14まで
`fn(t, a2, ..., aN)` の呼出しが [`INVOKE`](/reference/concepts/Invoke.md)`(pm, t, a2, ..., aN)` と等価となる [*Callable*](/reference/concepts/Callable.md) オブジェクト `fn` を返す。

`fn` の型には、必要に応じて型の別名 `argument_type`, `first_argument_type`, `second_argument_type`, `result_type` が定義される。

### C++17から
C++14までと同様だが、`fn`が*simple call wrapper*（引数を完全転送する呼び出しラッパー）であることが要求される。すなわち、右辺値の実引数は右辺値参照として、左辺値の実引数は左辺値参照として、それぞれ`pm`へ渡される。これにより、値渡しのパラメータを持つメンバ関数ポインタに対して余分なコピーやムーブが発生しないことが保証される。

### C++20から
`fn(call_args...)`の呼び出しが[`invoke`](/reference/functional/invoke.md)`(pmd,  call_args...)`を行う*simple call wrapper*オブジェクト `fn` を返す。  
ここで、`pmd`は`R T::* pmd(pm)`のように初期化された`fn`が保持するメンバポインタ、`call_args...`は`pm`の関数呼び出しに必要となる引数リストである。  
引数リスト`call_args...`は完全転送される。

メンバポインタ呼び出しのためには`call_args...`の先頭に、`T`のオブジェクトもしくはそれを参照する何らかのものが無ければならない（詳細は[`INVOKE`](/reference/concepts/Invoke.md)を参照）。

## 例外
投げない


## 例
```cpp example
#include <functional>
#include <memory>
#include <iostream>

int main() {
  auto l = std::make_shared<std::less<int>>();
  std::cout << std::boolalpha;
  std::cout << (*l)(3, 5) << std::endl;
  std::cout << std::mem_fn(&std::less<int>::operator ())(l, 3, 5) << std::endl;
  std::cout << std::bind(*l, std::placeholders::_1, 5)(3) << std::endl;

  // std::cout << std::bind(l, std::placeholders::_1, 5)(3) << std::endl;
  //   エラー！ std::shared_ptr< std::less<int> > は Callable ではない

  // mem_fn() で包むと Callable になる
  std::cout <<
      std::bind(std::mem_fn(&std::less<int>::operator ()), l, std::placeholders::_1, 5)(3)
  << std::endl;
}
```
* std::mem_fn[color ff0000]
* std::make_shared[link /reference/memory/make_shared.md]
* std::less[link less.md]
* std::bind[link bind.md]
* std::placeholders::_1[link placeholders.md]
* Callable[link /reference/concepts/Callable.md]

### 出力
```
true
true
true
true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2048. Unnecessary `mem_fn` overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2048)
    - 不必要なオーバーロードを、C++14で削除
- [LWG Issue 2486. `mem_fn()` should be required to use perfect forwarding](https://cplusplus.github.io/LWG/issue2486)
    - `mem_fn`が返すオブジェクトが引数を完全転送する*simple call wrapper*であることが要求された
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。引数の転送方法は元の規定では未規定であり、処理系は当初から完全転送していたため
- [LWG Issue 2489. mem_fn() should be noexcept](https://wg21.cmeerw.net/lwg/issue2489)
- [P1065R2 constexpr INVOKE](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1065r2.html)
