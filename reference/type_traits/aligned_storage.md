# aligned_storage
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp23deprecated[meta cpp]

```cpp
namespace std {
  template <std::size_t Len,
            std::size_t Align = default-alignment>
  struct aligned_storage {
    using type = …;
  };                                                                   // (1) C++11

  template <std::size_t Len,
            std::size_t Align = default-alignment>
  using aligned_storage_t = typename aligned_storage<Len,Align>::type; // (2) C++14
}
```
* default-alignment[italic]

この機能はC++23で非推奨となった。代わりに`alignas(T)` [`std::byte`](/reference/cstddef/byte.md)`[sizeof(T)];`を使用することを推奨する。


## 概要
アライメント調整された領域を作る。


## 要件
`Len`が非ゼロであること。`Align`は、得ようとしてる領域の要素型`T`に対する`alignof(T)`と同じ大きさか、もしくはデフォルト値であること。


## 効果
- `aligned_storage`は、領域サイズ`Len`、アライメント`Align`で調整した未初期化領域をメンバ型`type`として定義する。
- メンバ型`type`は以下の型に分類されること：
    - C++11 : [POD型](is_pod.md)
    - C++20 : [トリビアル型](is_trivial.md)

`Align`のデフォルト値は、`Len`よりも大きくない、最も厳格なアライメント要件を持つ、C++の何らかのオブジェクト型のアラインメント値。


## 非推奨の詳細 (C++23)
この機能は、いくつかの点で高いレベルの有害になりえる：

- この機能を呼び出すことで未定義動作を引き起こす (この型はストレージを提供するわけではない)
- 保証が正しくない (標準では、型が少なくとも要求された以上の大きさであることのみを要件としているだけで、上限サイズを要求できない)
- APIが多くの理由で間違っている。そのためにこのAPIを使うために繰り返し同じ事前作業が必要になる。API設計が間違っている理由は以下：
    - `::type`の値にアクセスするために`reinterpret_cast`が必要となってしまう。これによって`constexpr`で使用できず、未定義動作を引き起こせてしまう
    - C++14で導入された`aligned_storage_t`ではなく誤って`aligned_storage`を使用してしまい、その違いに気づきにくい (`aligned_storage`は`::type`を指定しなければならない)
    - 少なくともNバイト以上という指定はできるが、実際のサイズ (上限サイズ) を指定できないため、必要以上のメモリが使用される可能性がある

これらの問題は[`aligned_union`](aligned_union.md)も同様だが、とくに`aligned_storage`では以下のような問題がある：

- テンプレートパラメータとして型をとらず、サイズをとってしまっている
    - この機能は非常に稀な状況を除いて、`Align`パラメータは`Len`パラメータに対して決まった指定の仕方をする。第1テンプレート引数として`sizeof(T)`を指定するのであれば、第2テンプレート引数には`alignof(T)`を指定しなければならない。`typename aligned_storage<sizeof(T), alignof(T)>::type`
- 第2テンプレートパラメータにデフォルト引数が設定されている
    - このテンプレートパラメータは本来必要ないだけでなく、デフォルト引数が付けられてしまっている。コンパイラが`aligned_storage_t<sizeof(T)>`という使い方をやめさせる方法はない。第2テンプレートパラメータは実装定義のデフォルト値をもつが、`T`に対して十分な場合とそうでない場合がある。そのため、暗黙に不正確になることを許可してしまっている

Facebookの`folly::aligned_storage_for_t`はこれらの問題を解決している。

この機能を以下のように置き換えることを推奨する：

```diff
template <typename T>
class MyContainer {
  // [...]
private:
- std::aligned_storage_t<sizeof(T), alignof(T)> t_buff;
+ alignas(T) std::byte t_buff[sizeof(T)];
  // [...]
};
```
* std::byte[link /reference/cstddef/byte.md]


## 例
### スタック領域を使用するコンテナ実装の例 (C++11)
```cpp example
#include <iostream>
#include <type_traits>

template <class T, std::size_t Capacity>
class StackContainer {
  // 長さ：sizeof(T) * Count、
  // アライメント：alignof(T)
  // でアライメント調整された領域を作る
  typename
    std::aligned_storage<sizeof(T) * Capacity, alignof(T)>::type
  storage_;

  T* ptr_ = nullptr;
  std::size_t size_ = 0;

public:
  void push(T value)
  {
    // 未初期化領域に要素を作る
    if (size_ <= 0) {
      ptr_ = new (&storage_) T(value);
    }
    else {
      new (ptr_ + size_) T(value);
    }
    ++size_;
  }

  T& front()
  {
    return *ptr_;
  }

  ~StackContainer()
  {
    for (std::size_t i = 0; i < size_; ++i) {
      (ptr_ + i)->~T();
    }
  }
};

int main()
{
  StackContainer<int, 3> cont;
  cont.push(1);

  std::cout << cont.front() << std::endl;
}
```
* std::aligned_storage[color ff0000]

#### 出力
```
1
```

### スタック領域を使用するコンテナ実装の例 (C++17)
```cpp
#include <iostream>
#include <type_traits>
#include <new>

template <class T, std::size_t Capacity>
class StackContainer {
  // 長さ：sizeof(T) * Count、
  // アライメント：alignof(T)
  // でアライメント調整された領域を作る
  typename
    std::aligned_storage<sizeof(T) * Capacity, alignof(T)>::type
  storage_;

  std::size_t size_ = 0;

  T* data()
  {
    return std::launder(reinterpret_cast<T*>(&storage_));
  }

public:
  void push(T value)
  {
    // 未初期化領域に要素を作る
    new (data() + size_) T(value);
    ++size_;
  }

  T& front()
  {
    return *data();
  }

  ~StackContainer()
  {
    for (std::size_t i = 0; i < size_; ++i) {
      (data() + i)->~T();
    }
  }
};

int main()
{
  StackContainer<int, 3> cont;
  cont.push(1);

  std::cout << cont.front() << std::endl;
}
```
* std::aligned_storage[color ff0000]
* std::launder[link /reference/new/launder.md]

#### 出力
```
1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.5.4 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2010までは、`Align`のデフォルト実引数が定義されていない。
	- 2012からは、`Align`のデフォルト実引数は`std::alignment_of<max_align_t>::value`と定義されている。
	- `aligned_storage_t`は2013から


## 関連項目
- [C++20 PODを非推奨化](/lang/cpp20/deprecate_pod.md)


## 参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
    - C++14で`aligned_storage_t`が定義された
- [P0767R1 Deprecate POD](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0767r1.html)
    - C++20でPOD用語の非推奨化にともない、メンバ型`type`がPOD型ではなくトリビアル型に分類されるよう規定が変更された
- [P1413R3 Deprecate `std::aligned_storage` and `std::aligned_union`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1413r3.pdf)
    - C++23でこの機能が非推奨となった
