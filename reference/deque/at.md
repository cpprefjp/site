#at
```cpp
reference at(size_type n);
const_reference at(size_type n) const;
```

##概要

任意位置の要素への参照を取得する。

この関数は、`deque`コンテナオブジェクト中の位置`n`にある要素への参照を返す。
[`operator[]`](/reference/deque/op_at.md)メンバ関数は範囲外アクセスの動作が未規定だが、この関数は範囲外アクセスの場合に [`out_of_range`](/reference/stdexcept.md) 例外を送出する。


##戻り値

コンテナ内の指定された位置の要素。
メンバ型 `reference`、`const_reference` は、コンテナ内の要素への参照型である。



##例外

`n >= size()` である場合、[`out_or_range`](/reference/stdexcept.md) 例外を投げる。


##計算量

定数時間


##例

```cpp
#include <iostream>
#include <deque>
#include <stdexcept>

int main()
{
  std::deque<int> c = {1, 2, 3};
 
  // 1番目の要素を取得する
  int& x = c.at(1);
  std::cout << x << std::endl;

  // 範囲外アクセス
  try {
    c.at(100);
  }
  catch (std::out_of_range&) {
    std::cout << "out of range!" << std::endl;
  }
}
```
* at[color ff0000]
* at[color ff0000]

###出力

```cpp
42 42 42 0 0
```

##参照


| | |
|----------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`operator[]`](/reference/deque/op_at.md) | 任意位置の要素への参照を取得する |


