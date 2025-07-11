# key_equiv
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
struct key_equiv {
  key_equiv(key_compare c) : comp(c) { }

  bool operator()(const_reference x, const_reference y) const {
    return !comp(x.first, y.first) && !comp(y.first, x.first);
  }

  key_compare comp;
};
```

## 概要
要素をとってキーの等価比較を行う説明専用の関数オブジェクト。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
