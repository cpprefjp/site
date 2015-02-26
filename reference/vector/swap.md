#swap
* vector[meta header]
* std[meta namespace]
* vector[meta class]

```cpp
void swap(vector& x);
```

##概要
他の`vector`オブジェクトとデータを入れ替える。


##効果
`*this`の内容と[`capacity()`](./capacity.md)を`x`と交換する。


##戻り値
なし


##計算量
定数時間


##備考
swapされるコンテナの要素を指す参照、ポインタ、イテレータを無効化しない。

(ただし、[`end()`](./end.md)が指すイテレータはどの要素も指していないが、無効になることがある。)


##例
```cpp
#include <iostream>
#include <vector>

template <class T>
void print(const char* name, const std::vector<T>& v)
{
  std::cout << name << " : {";

  for (const T& x : v) {
    std::cout << x << " ";
  }

  std::cout << "}" << std::endl;
}

int main()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {4, 5, 6};

  v1.swap(v2);

  print("v1", v1);
  print("v2", v2);
}
```
* swap[color ff0000]

###出力
```
v1 : {4 5 6 }
v2 : {1 2 3 }
```

