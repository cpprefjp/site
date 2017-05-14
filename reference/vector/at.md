# at
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
const_reference at(size_type n) const;
reference at(size_type n);
```

## 概要
要素アクセス


## 戻り値
`n`番目の要素への参照を返す。


## 計算量
定数時間


## 例外
`n >=` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


## 備考
`at(n)` は `*(`[`begin()`](begin.md)` + n)` と同じ結果となるが、イテレータを使用したランダムアクセスや[`operator[]`](op_at.md)と違い、コンテナの要素数に対して境界チェックを行う。


## 例
```cpp
#include <iostream>
#include <vector>
#include <stdexcept>

int main()
{
  std::vector<int> v = {3, 1, 4};

  // 2番目の要素を参照する
  int& x = v.at(2);
  std::cout << x << std::endl;

  // 範囲外アクセスした場合、例外が投げられる
  try {
    int& y = v.at(3);
  }
  catch (std::out_of_range& ex) {
    std::cout << "out of range" << std::endl;
  }
}
```
* at[color ff0000]
* std::out_of_range[link /reference/stdexcept.md]

### 出力
```
4
out of range

```

