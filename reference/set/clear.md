#clear
```cpp
void clear() noexcept;
```

##概要
`set` コンテナ内の全ての要素を削除する。それぞれのデストラクタが呼ばれ、コンテナから削除される。[`size()`](./size.md) は 0 になる。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <set>
using namespace std;
 
int main ()
{
  set<int> c;
  
  c.insert(10);
  c.insert(20);
  c.insert(30);
 
  cout << c.size() << endl;
 
  c.clear();
 
  cout << c.size() << endl;
  
  return 0;
}
```

###出力
```
3
0
```

##参照

| | |
|-------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`erase`](./erase.md) | 要素を削除する |
| [`size`](./size.md) | 要素数を取得する |
| [`empty`](./empty.md) | コンテナが空であるかどうかを調べる |



