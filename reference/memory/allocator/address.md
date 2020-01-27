# address
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
pointer address(reference x) const;                      // (1) C++03
pointer address(reference x) const noexcept;             // (1) C++11

const_pointer address(const_reference x) const;          // (2) C++03
const_pointer address(const_reference x) const noexcept; // (2) C++11
```

この関数は、C++17から非推奨となり、C++20で削除された。オブジェクトから直接アドレスを取得すること。


## 概要
変数のアドレスを取得する。


## 戻り値
- C++03 : `&x`
- C++11 : `operator&`がオーバー�ードされていたとしても、`x`が参照するオブジェクトのアドレスを返す。


## 非推奨・削除の詳細
オブジェクトからのアドレス取得は、ア�ケータの実装に依�せず、オブジェクト`x`に対して式`&x`もしくは[`std::addressof`](/reference/memory/addressof.md)`(x)`の方法を使用すればよかった。

この関数は必要なかったため、非推奨となった。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::allocator<int> alloc;

  int x = 3;

  // 変数xのアドレスを取得する
  int* p = alloc.address(x);

  std::cout << std::hex << p << std::endl;
  std::cout << std::dec << x << std::endl;
}
```
* address[color ff0000]
* std::hex[link /reference/ios/hex.md]
* std::dec[link /reference/ios/dec.md]

### 出力例
```
0x7fff54064a7c
3
```


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
