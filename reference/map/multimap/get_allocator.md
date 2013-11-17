#get_allocator
```cpp
allocator_type get_allocator() const noexcept;
```

##概要
コンテナの構築に使われたアロケータオブジェクトを返す。


##戻り値
アロケータオブジェクト。
メンバ型 `allocator_type` は、`multimap` クラスがインスタンス化されるのに使われる 4 番目のテンプレートパラメータ(`Allocator` 型)と同じ型として定義される。


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  multimap<int,char> c;
  pair<const int,char> * p;

  p = c.get_allocator().allocate(2);

  p[0].second = 'a';
  p[1].second = 'b';

  std::cout << p[0].second << endl;
  std::cout << p[1].second << endl;

  c.get_allocator().deallocate(p, 2);

  return 0;
}
```

###出力
```
a
b
```

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0
