#destroy (C++11)
* memory[meta header]
* std[meta namespace]

```cpp
template <class T>
static void destroy(Alloc& a, T* p);
```

##概要
インスタンスを破棄する。


##効果
`a.destroy(p)`という式が有効ならそれを呼び出し、そうでなければデフォルト実装として`p->~T()`を呼び出す。


##戻り値
なし


##例
```cpp
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

###出力
```
3, a
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0
