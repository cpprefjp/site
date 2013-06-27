#clear
```cpp
void clear() noexcept;
```

##概要
`map` コンテナ内の全ての要素を削除する。それぞれのデストラクタが呼ばれ、コンテナから削除される。[`size()`](./size.md) は 0 になる。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <map>

using namespace std;

int main() 
{
  map<int, char> c;
  c[3] = 'C';
  c[4] = 'D';
  c[1] = 'A';
  c[2] = 'B';
  
  std::cout << c.size() << endl;

  c.clear();

  std::cout << c.size() << endl;
  
  return 0;
}
```

###出力
```
4
0
```

##参照

| | |
|-------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`erase`](./erase.md) | 要素を削除する |
| [`size`](./size.md) | 要素数を取得する |
| [`empty`](./empty.md) | コンテナが空であるかどうかを調べる |



