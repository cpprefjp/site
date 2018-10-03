# operator[]
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
reference operator[](size_type n);
const_reference operator[](size_type n) const;
```

## 概要
要素アクセス


## 戻り値
`n`番目の要素への参照を返す。


## 計算量
定数時間


## 備考
`vector`型のオブジェクト`v`に対して、`v[n]` と `*(v.`[`begin()`](begin.md)` + n)` は同じ結果になる。


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  // 2番目の要素を参照する
  int& x = v[2];
  std::cout << x << std::endl;
}
```

### 出力
```
4
```

