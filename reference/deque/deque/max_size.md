# max_size
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
size_type max_size() const noexcept;
```

## 概要
コンテナに格納可能な最大数を取得する。


## 戻り値
コンテナに格納可能な最大数


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
  std::deque<int> c;
  std::size_t s = c.max_size();

  std::cout << s << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
4611686018427387903
```

## 関連項目

| 名前 | 説明 |
|-------------------------|------------------|
| [`size`](size.md)     | 要素数を取得する |
| [`resize`](resize.md) | 要素数を変更する |


