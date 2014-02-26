#代入演算子(C++11)
```cpp
unique_ptr& operator=(unique_ptr&& u) noexcept;       // (1) 単一オブジェクト、配列

template <class U, class E>
unique_ptr& operator=(unique_ptr<U, E>&& u) noexcept; // (2) 単一オブジェクト

unique_ptr& operator=(nullptr_t) noexcept;            // (3) 単一オブジェクト、配列
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]

##概要
- (1) : 自身が保持しているリソースを解放し、`u`から`*this`に所有権を譲渡する。
- (2) : 自身が保持しているリソースを解放し、変換可能な`u`から`*this`に所有権を譲渡する
- (3) : 自身が保持しているリソースを解放する。


##要件
- (1) : デリータの型`D`が、例外を投げずにムーブ構築可能であること。
- (2) : 以下の条件を満たさない場合、この関数はオーバーロード解決の候補から外れる：
    - `unique_ptr<U, E>::pointer`が、`pointer`に暗黙変換可能な型であること。
    - `U`が配列型ではないこと。


##効果
- (1), (2) :

```cpp
reset(u.release());
d_ = std::forward<D>(u.get_deleter());
```
* reset[link ./reset.md]
* release[link ./release.md]
* forward[link /reference/utility/forward.md]
* get_deleter[link ./get_deleter.md]


- (3) : [`reset()`](./reset.md)


##戻り値
`*this`


##例外
投げない


##例
```cpp
#include <cassert>
#include <memory>

int main()
{
  std::unique_ptr<int> p0(new int(3));

  // (1) ムーブ代入
  // p0の所有権をp1に譲渡する
  std::unique_ptr<int> p1;
  p1 = std::move(p0);
  assert(*p1 == 3);

  // (2) 変換可能な型からの所有権移動
  // p1の所有権をp2に譲渡する
  std::unique_ptr<void> p2;
  p2 = std::move(p1);
  assert(*static_cast<int*>(p2.get()) == 3);

  // (3) リソース解放
  std::unique_ptr<int> p3(new int(3));
  p3 = nullptr;
  assert(!p3);
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7 (nullptr_tのオーバーロード以外), 4.6.4
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
