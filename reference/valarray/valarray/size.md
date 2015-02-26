#size
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
size_t size() const;
```

##概要
要素数を取得する。


##戻り値
`valarray`オブジェクトに含まれる要素数を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<int> v = {1, 2, 3};

  std::size_t size = v.size();
  std::cout << size << std::endl;
}
```
* size()[color ff0000]

###出力
```
3
```


