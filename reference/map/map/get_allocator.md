#get_allocator
* map[meta header]
* std[meta namespace]

```cpp
allocator_type get_allocator() const noexcept;
```

##概要
コンテナの構築に使われたアロケータオブジェクトを返す。


##戻り値
アロケータオブジェクト。
メンバ型 `allocator_type` は、`map` クラスがインスタンス化されるのに使われる 4 番目のテンプレートパラメータ(`Allocator` 型)と同じ型として定義される。


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::map<int,char> c;
  std::pair<const int,char> * p;

  p = c.get_allocator().allocate(2);

  p[0].second = 'a';
  p[1].second = 'b';

  std::cout << p[0].second << std::endl;
  std::cout << p[1].second << std::endl;

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0
