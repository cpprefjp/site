#get_allocator
```cpp
allocator_type get_allocator() const noexcept;
```

##概要

　コンテナの構築に使われたアロケータオブジェクトを返す。


##戻り値

　アロケータ。

　メンバ型 allocator_type は、set クラスがインスタンス化されるのに使われる 3 番目のテンプレートパラメータ(Allocator 型)と同じ型として定義される。


##例外

　投げない。


##計算量

　低数時間。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
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
}</pre>
```

###出力

```cpp
42 43
```

##

