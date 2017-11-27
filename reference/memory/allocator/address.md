# address
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]

```cpp
// C++03
pointer address(reference x) const;
const_pointer address(const_reference x) const;

// C++11
pointer address(reference x) const noexcept;
const_pointer address(const_reference x) const noexcept;
```

この関数は、C++17から非推奨となった。オブジェクトから直接アドレスを取得すること。


## 概要
変数のアドレスを取得する。


## 戻り値
- C++03 : `&x`
- C++11 : `operator&`がオーバーロードされていたとしても、`x`が参照するオブジェクトのアドレスを返す。


## 非推奨の詳細
オブジェクトからのアドレス取得は、アロケータの実装に依存せず、オブジェクト`x`に対して式`&x`もしくは[`std::addressof`](/reference/memory/addressof.md)`(x)`の方法を使用すればよかった。

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
