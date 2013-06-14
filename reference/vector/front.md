#front
```cpp
reference front();
const_reference front() const;
```

##概要
先頭要素への参照を取得する。


##戻り値
先頭要素への参照


##計算量
定数時間


##備考
`a.front()` と `*a.begin()` は同じ結果になる。


##例
```cpp
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int& x = v.front();
  std::cout << x << std::endl;
}
```

###出力
```
3
```

