#construct (C++11)
```cpp
template <class T, class... Args>
static void construct(Alloc& a, T* p, Args&&... args);
```

##概要
引数を元にインスタンスを構築する。


##効果
`a.construct(p, std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...)`という式が有効ならそれを呼び出し、そうでなければデフォルト実装として`::new(static_cast<void*>(p) T(`[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`を呼び出す。


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
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.7.3
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0, 12.0
	- Visual C++ 11.0までは、可変引数テンプレートに対応していないため、不完全な実装である。
