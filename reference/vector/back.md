#back
```cpp
reference back();
const_reference back() const;
```

##概要
末尾要素への参照を取得する


##戻り値
末尾の要素への参照を返す。

`a.back()` は `{ auto tmp = a.end(); --tmp; return *tmp; }` と同じ結果になる。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> myvector;

  myvector.push_back(10);

  while (myvector.back() != 0) {
    myvector.push_back ( myvector.back() -1 );
  }

  std::cout << "myvector contains:";
  for (unsigned i=0; i<myvector.size() ; i++)
    std::cout << " " << myvector[i];

  std::cout << std::endl;

  return 0;
}
```

###出力
```
myvector contains: 10 9 8 7 6 5 4 3 2 1 0 
```

