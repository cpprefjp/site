# デストラクタ
* stop_token[meta header]
* std[meta namespace]
* stop_source[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
~stop_source();
```

## 効果
自身が共有している停止状態の所有権を手放す。  
ほかに停止状態を共有しているオブジェクトがいない場合は、停止状態を扱うために確保したリソースを解放する。
