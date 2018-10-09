# デストラクタ
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
~vector()
```

## 概要
`vector`が保持している全ての要素に対してデストラクタを実行し、メモリを解放する。


## 例外
投げない


## 計算量
全要素のデストラクタを呼び出すために線形時間。

処理系によっては、以下のような最適化を行い、定数時間で実装している：

- デストラクタを呼び出す必要のない型に対しては、デストラクタを呼ばない。
- そのような型は、[`is_trivially_destructible<T>`](/reference/type_traits/is_trivially_destructible.md)`::value == true`となる、ユーザー定義されたデストラクタを持たない型

