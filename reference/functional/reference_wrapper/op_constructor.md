# コンストラクタ
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template<class U>
reference_wrapper(U&& u) noexcept(/*see below*/);                 // (1) C++11

template<class U>
constexpr reference_wrapper(U&& u) noexcept(/*see below*/);       // (1) C++20

reference_wrapper(const reference_wrapper& x) noexcept;           // (2) C++11

constexpr reference_wrapper(const reference_wrapper& x) noexcept; // (2) C++20
```

## 概要
与えられた参照で、参照オブジェクトを構築する。

- (1) : `T& r = ` [`forward`](/reference/utility/forward.md)`<U>(u)`のように作成した`r`への参照を保持する`reference_wrapper`オブジェクトを構築する  
  `u`が右辺値参照、もしくは参照とCV修飾を除去した`U`が`reference_wrapper<T>`である（`is_same_v<remove_cvref_t<U>, reference_wrapper<T>> == true`となる）場合、このコンストラクタはオーバー�ード解決に参加しない

- (2) : `x.`[`get()`](/reference/functional/reference_wrapper/get.md)への参照を保持する`reference_wrapper`オブジェクトを構築する

## 例外
- (1) : 投げない（右辺値参照を受け取らない限り`noexcept`指定される）
- (2) : 投げない

## 備考
右辺値参照を保持してしまうことを防�するために`reference_wrapper(T&&) = delete;`のようなコンストラクタを用意しないのは、この`delete`指定コンストラクタの�在によって`T&&`から`reference_wrapper<T>`への暗黙変換が引き起こされることを防�するためである（なお、そのような変換が起こったとしても`delete`指定コンストラクタが選ばれるため右辺値参照を保持することは無い）。  
ただし、これはC++17規格完成後の欠陥報告（[LWG Issue 2993](https://wg21.cmeerw.net/lwg/issue2993)）による修�のため、実装によっては`delete`指定したコンストラクタを用意している可能性がある。

## 例
```cpp example
#include <iostream>
#include <functional>

int main()
{
  int x = 3;

  // (1)
  // xへの参照を保持する
  std::reference_wrapper<int> r(x);
  r.get() += 1;
  std::cout << x << std::endl;

  // (2)
  // 参照ラッパーrが指すxへの参照を保持する
  std::reference_wrapper<int> r2(r);
  r2.get() += 1;
  std::cout << x << std::endl;
}
```
* r.get()[link get.md]

### 出力
```
4
5
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2993. reference_wrapper<T> conversion from T&&](https://wg21.cmeerw.net/lwg/issue2993)
