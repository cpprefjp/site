# max_size
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
size_type max_size() const noexcept;
```

## 概要
`set` コンテナが格納できる要素の最大数を返す。 
これは、システムやライブラリ実装の制限のもとでコンテナが格納できる潜在的な最大サイズである。


## 戻り値
`set` コンテナが自身のコンテンツとして保持できる要素の最大数。  
メンバ型 `size_type` は符号なし整数型である。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <set>

int main ()
{
  std::set<int> c;

  std::cout << c.max_size() << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
1073741823
```

## 関連項目

| 名前                | 説明             |
|---------------------|------------------|
| [`size`](size.md) | 要素数を取得する |
