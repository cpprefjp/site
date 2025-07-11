# デストラクタ
* mutex[meta header]
* std[meta namespace]
* lock_guard[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~lock_guard();
```

## 概要
ロックを手放す


## 効果
```cpp
m.unlock();
```

（`m`はメンバ変数として保持している、ミューテックスオブジェクトへの参照）


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
