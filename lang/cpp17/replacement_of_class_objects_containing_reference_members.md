# 参照メンバをもつクラスの置き換え
* cpp17[meta cpp]

## 概要
`placement new`を使用して、参照型や`const`データメンバを含む構造体/クラスを置き換える際、オブジェクト生�期間(lifetime)に基づいた最適化の抑�をコンパイラに伝える関数[`std::launder()`](/reference/new/launder.md)を用いることで、未定義動作となるような文脈で参照型や`const`データメンバへのアクセスができる。

## 仕様
[n4659](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4659.pdf) [ptr.launder]/5より

```cpp
struct X { const int n; };
X *p = new X{3};
const int a = p->n;
new (p) X{5};  // X::nはconstなので、pは新しいオブジェクトを指していない
const int b = p->n;  // 未定義動作
const int c = std::launder(p)->n;  // OK
```
* std::launder[link /reference/new/launder.md]

## 例
```cpp example
#include <iostream>
#include <new>

struct X 
{
  int& n;
};

int main()
{
  int n = 12;
  X *p = new X{n};
    
  int m = 34;
  new (p) X{m};
    
  n = 56;
  m = 78;
  
  // const int a = p->n;  // 未定義動作
  const int a = std::launder(p)->n;  // OK
    
  std::cout << a << std::endl;
}
```
* std::launder[link /reference/new/launder.md]

### 出力
```
78
```

## この機能が必要になった背景・経緯
以前は、`placement new`の戻り値を用いることで未定義動作を起こさないようにすることができた。そして、[`std::optional`](/reference/optional/optional.md)のようなクラスでは、次のように`placement new`の戻り値を保持するために、メンバにポインタを追加する必要があった。

```cpp
template <typename T> 
class coreoptional
{
private:
  T payload;
  T* p;  // placement newの戻り値を使えるようにする
public:
  coreoptional(const T& t)
   : payload(t) {
     p = &payload;
  }
  template<typename... Args>
  void emplace(Args&&... args) {
    payload.~T();
    p = ::new (&payload) T(std::forward<Args>(args)...);
  }
  const T& operator*() const & {
    return *p;  // ここで payload を使わないでください!
  }
};
```
* std::forward[link /reference/utility/forward.md]

このオーバーヘッドを避けるために`std::launder()`関数が導入された。

## 備考
ストレージの再利用については、ほかにも追加された機能がある。ストレージを再利用する際は、[Lifetime - cppreference.com](https://en.cppreference.com/w/cpp/language/lifetime)を参照してもよいと思われる。

## 参照
- [std::launder関数 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20170817/p1)
- [［C++］メンバに参照型を持つクラス（構造体）の取り扱い - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2018/10/23/010840)
- [P0532R0 On `launder()`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0532r0.pdf)
- [Core Issue 1776: Replacement of class objects containing reference members](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0137r1.html)
- [ std :: launder  -  cppreference.com ](https://translate.googleusercontent.com/translate_c?depth=1&hl=ja&rurl=translate.google.com&sl=en&sp=nmt4&tl=ja&u=https://en.cppreference.com/w/cpp/utility/launder&xid=17259,15700021,15700124,15700186,15700191,15700201,15700237,15700242,15700248&usg=ALkJrhhMzC3zGFnlq6UBLNSPrRqUFR4OFA)
- [Pointer safety and placement new](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4303.html)
- [Implementability of std::optional （std :: optionalの実装可能性） ](https://groups.google.com/a/isocpp.org/forum/#!msg/std-proposals/93ebFsxCjvQ/Q5LUnO8339wJ)
- [Lifetime - cppreference.com](https://en.cppreference.com/w/cpp/language/lifetime)

