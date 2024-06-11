# destroy
* memory[meta header]
* std[meta namespace]
* allocator_traits[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class T>
static void destroy(Alloc& a, T* p);                // C++17 まで
template <class T>
static constexpr void destroy(Alloc& a, T* p);      // C++20 から
```

## 概要
インスタンスを破棄する。


## 効果
- C++17 まで
	`a.destroy(p)` という式が有効ならそれを呼び出し、そうでなければデフォルト実装として `p->~T()` を呼び出す。
- C++20 から
	`a.destroy(p)` という式が有効ならそれを呼び出し、そうでなければデフォルト実装として [`destroy_at`](../destroy_at.md)`(p)` を呼び出す。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <memory>
#include <utility>

int main()
{
  using value_type = std::pair<int, char>;
  std::allocator<value_type> alloc;
  using traits = std::allocator_traits<decltype(alloc)>;

  std::size_t n = 1;
  value_type* p = traits::allocate(alloc, n);

  // メモリ領域にpairオブジェクトを構築
  traits::construct(alloc, p, 3, 'a');

  std::cout << p->first << ", " << p->second << std::endl;

  // pairオブジェクトを破棄
  traits::destroy(alloc, p);

  traits::deallocate(alloc, p, n);
}
```
* destroy[color ff0000]
* traits::allocate[link allocate.md]
* traits::construct[link construct.md]
* traits::deallocate[link deallocate.md]

### 出力
```
3, a
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 参照
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
