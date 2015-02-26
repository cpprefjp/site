#size
* vector[meta header]
* std[meta namespace]
* vector[meta class]

```cpp
size_type size() const noexcept;
```

##概要
コンテナの要素数を取得する。


##戻り値
`vector`オブジェクトに含まれる要素数を返す。


##例外
投げない


##計算量
定数時間


##備考
`a.size()` と [`distance`](/reference/iterator/distance.md)`(a.`[`begin`](./begin.md)`(), a.`[`end`](./end.md)`())` は同じ結果になる。


##例
```cpp
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4, 5, 2};

  std::size_t size = v.size();
  std::cout << size << std::endl;
}
```
* size[color ff0000]

###出力
```
5
```

