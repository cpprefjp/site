#lock
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
shared_ptr<T> lock() const noexcept;
```
* shared_ptr[link /reference/memory/shared_ptr.md]

##概要
監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを取得する。


##戻り値
```cpp
expired() ? shared_ptr<T>() : shared_ptr<T>(*this)
```
* expired()[link expired.md]
* shared_ptr[link /reference/memory/shared_ptr.md]

監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトが有効な状態なら、その[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトとリソースを共有する[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを作って返す。これによって、ロックしている間、[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトの寿命が尽きないようにする。

監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトが寿命切れ状態なら、空の[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを作って返す。


- C++14 : 上記に相当することをアトミックに実行する。


##備考
(この関数が`shared_ptr`オブジェクトではなく生ポインタを返す設計になっていない理由を解説する。以下のコードを考えてみよう：

```cpp
std::shared_ptr<int> sp(new int(3));
std::weak_ptr<int> wp = sp;

// …この間に、spの寿命が切れるかもしれない…

if (int* r = wp.lock()) {
  std::cout << *r << std::endl;
}
```
* lock()[color ff0000]

このコードの場合、ロックを取得した`if`文内で、`shared_ptr`オブジェクト`sp`に対して[`reset()`](/reference/memory/shared_ptr/reset.md)が呼ばれると、ポインタ`p`がダングリングポインタ(dangling pointer : 不正な領域を指すポインタ)になってしまう。

この関数が[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを返す設計になっていることで、ロック取得したポインタがダングリングポインタになってしまう問題を回避できる。



##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> sp(new int(3));
  std::weak_ptr<int> wp = sp;

  // …この間に、spの寿命が切れるかもしれない…

  // wpが監視しているshared_ptrオブジェクトの
  // 寿命が切れていなければ処理する
  if (std::shared_ptr<int> r = wp.lock()) {
    std::cout << *r << std::endl;
  }
  else {
    // shared_ptrオブジェクトの寿命が切れている
    std::cout << "sp is expired" << std::endl;
  }
}
```
* lock()[color ff0000]

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照
- [LWG 2316 - weak_ptr::lock() should be atomic](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-active.html#2316)

