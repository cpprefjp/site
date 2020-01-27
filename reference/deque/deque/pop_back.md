# pop_back
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
void pop_back();
```

## 概要
末尾要素を削除する。


## 要件
[`empty()`](pop_back.md) `== false`であること。


## 戻り値
なし

## 例外

投げない

## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> c = {1, 2, 3};

  c.pop_back();

  for (int x : c) {
    std::cout << x << std::endl;
  }
}
```
* pop_back()[color ff0000]

### 出力
```
1
2
```

## 関連項目

| 名前 | 説明 |
|-------------------------------|--------------------|
| [`pop_front`](pop_front.md) | 先�要素を削除する |
| [`push_back`](push_back.md) | 末尾に要素を追加する |
| [`erase`](erase.md)         | 指定した要素を削除する |


