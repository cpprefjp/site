# shared_from_this
* memory[meta header]
* std[meta namespace]
* enable_shared_from_this[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
shared_ptr<T> shared_from_this();
shared_ptr<const T> shared_from_this() const;
```
* shared_ptr[link /reference/memory/shared_ptr.md]

## 概要
`this`ポインタを`shared_ptr`に変換する。


## 要件（C++11）
`*this`のインスタンスが[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトとして共有されていること。


## 戻り値

### C++11
`this`ポインタを、`enable_shared_from_this`の派生クラス型`T`の[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトとして構築して返す。  
要件を満たしていない場合は未定義動作となる。

### C++17
保持する`this`を指すポインタを`weak_this`（`weak_ptr<T>`）とすると、以下と�価。

`return shared_ptr<T>(weak_this);`

## 例外（C++17）
この関数を呼び出した時点で、`*this`のインスタンスが[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトとして共有されていない場合、例外（おそらく[`bad_weak_ptr`](/reference/memory/bad_weak_ptr.md)）を投げる。

この動作が望ましくない場合は、代わりに[`weak_from_this()`](/reference/memory/enable_shared_from_this/weak_from_this.md)`.lock()`を用いることができる。この場合、例外を投げる代わりに空の`shared_ptr`オブジェクトを返す。

## 備考
`enable_shared_from_this<T>`の派生クラス型`T`のコンストラクタ内ではまだ`enable_shared_from_this`の保持する`this`を指すポインタが�定されていないので、本関数によって`this`を指す`shared_ptr`を取得することはできない。

その場合、C++14までならば未定義動作となり、C++17以降は例外を送出する。

## 例
```cpp example
#include <cassert>
#include <memory>

struct X : public std::enable_shared_from_this<X> {
  std::shared_ptr<X> f()
  {
    // thisを指すshared_ptrオブジェクトを作る
    return shared_from_this();
  }
};

int main()
{
  std::shared_ptr<X> p(new X());
  std::shared_ptr<X> q = p->f();

  assert(p == q);
}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013

## 参照
- [P0033R0 Re-enabling `shared_from_this`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0033r0.html)
- [P0033R1 Re-enabling `shared_from_this` (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0033r1.html)