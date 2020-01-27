# operator[]
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
T& operator[](const key_type& x);
T& operator[](key_type&& x);
```

## 概要
指定した�ーを持つ要素を取得する。対応する要素が�在しない場合は生成して返す。


## 戻り値
�ー`x`に対応する値を返す。対応する要素が�在しない場合は、要素をデフォルト構築して参照を返す。


## 計算量
要素数に対して対数時間


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m;
  m.insert(std::make_pair(1, 'a'));

  // �ー`1`に対応する要素を参照する
  char& a = m[1];
  std::cout << a << std::endl;

  // �ー`2`に対応する要素を生成する
  m[2] = 'b';
}
```
* m[1][color ff0000]
* m[2][color ff0000]
* m.insert[link insert.md]

### 出力
```
a
```

## 関連項目

| 名前 | 説明 |
|------------------------------------------------|-----------------------|
| [`operator=`](/reference/map/map/op_assign.md) | 代入演算� |
| [`insert`](/reference/map/map/insert.md) | 要素を挿入する |


