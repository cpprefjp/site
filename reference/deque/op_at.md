#operator[]
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
reference operator[](size_type n);
const_reference operator[](size_type n) const;
```

##概要
任意位置の要素への参照を取得する。

この関数は、`deque`コンテナオブジェクト中の位置`n`にある要素への参照を返す。

[`at()`](at.md)メンバ関数は範囲外アクセスの場合に [`out_of_range`](/reference/stdexcept.md) 例外を送出するが、この関数は範囲外アクセスの動作が未規定。


##戻り値
コンテナ内の指定された位置の要素を返す。

メンバ型 `reference`、`const_reference` はコンテナ要素への参照型である。


##計算量
定数時間


##備考
範囲外アクセス時の動作は未規定


##例
```cpp
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> c = {1, 2, 3};

  // 1番目の要素を取得する
  int& x = c[1];
  std::cout << x << std::endl;
}
```
* c[1][color ff0000]

###出力
```
2
```

##関連項目

| 名前 | 説明 |
|-----------------|----------------------------------|
| [`at`](at.md) | 任意位置の要素への参照を取得する |


