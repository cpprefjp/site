#get_allocator
```cpp
allocator_type get_allocator() const noexcept;
```

##概要
コンテナの構築に使われたアロケータオブジェクトを返す。


##戻り値
アロケータオブジェクト。
メンバ型 `allocator_type` は、`set` クラスがインスタンス化されるのに使われる 3 番目のテンプレートパラメータ(`Allocator` 型)と同じ型として定義される。


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  set<int> c;
  int * p;
 
  p = c.get_allocator().allocate(2);
 
  p[0] = 42;
  p[1] = 43;
 
  cout << p[0] << " " << p[1];
 
  c.get_allocator().deallocate(p, 2);
  
  return 0;
}
```

###出力
```
42 43
```

